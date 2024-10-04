import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
    Loading,
    useGetList
} from "react-admin";
import { useNavigate } from 'react-router-dom';

import { CardActionArea, Container, Stack, TextField as TextFieldMui } from '@mui/material';
import { AppContext } from './App';

export function ListCatalog() {

    const { webId, setWebId } = useContext(AppContext);
    const [_webId, _setWebId] = useState<string>(webId);
    const { data: catalogs, total, isLoading, error, refetch } = useGetList<{id: string, name: string, description: string}>("catalogs");
    const navigate = useNavigate();
  
    const changeWebId = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      _setWebId(e.target.value);
    }
      
    const applyWebIdChange = () => {
        setWebId(_webId);
        console.log(_webId);
    }
  
    useEffect(() => {
      refetch()
    }, [webId]);
  
    if (error) { return <p>ERROR</p>; }
  
    return (
      <Container>
        
        <Container sx={{my: 4}}>
          <Stack direction="row" spacing={2}>
              <TextFieldMui sx={{ width: '100%' }} id="webid" label="WebId" variant="standard" value={_webId} onChange={changeWebId} />
              <Button variant="contained" onClick={applyWebIdChange} disabled={webId === _webId}>LOAD</Button>
          </Stack>
        </Container>
  
        {isLoading && <Loading />}
  
        {!isLoading && <Stack spacing={2}>
            {webId !== "" && catalogs && catalogs.map((c, i) => 
            <CardActionArea onClick={() => navigate(`/catalogs/${encodeURIComponent(c.id)}/show`)} key={`catalog${i}`}>
                <Card sx={{ cursor: 'pointer' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {c.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {c.description}
                    </Typography>
                </CardContent>
                </Card>
            </CardActionArea>
            )
        }</Stack>}

      </Container>
    )
  }