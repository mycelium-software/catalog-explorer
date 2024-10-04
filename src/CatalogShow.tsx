import {
    ArrayField,
    Datagrid,
    Show,
    SimpleShowLayout,
    TextField
} from "react-admin";

import { Container } from '@mui/material';

export const CatalogShow = () => (
    <Container>
      <Show>
          <SimpleShowLayout>
              <TextField source="name" />
              <TextField source="description" />
              <TextField source="id" />
              <ArrayField source="catalogItems">
                <Datagrid bulkActionButtons={false}>
                  <TextField source="name" />
                  <TextField source="id" />
                </Datagrid>
              </ArrayField>
          </SimpleShowLayout>
        </Show>
      </Container>
  );