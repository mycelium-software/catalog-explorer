import { createContext, useState } from 'react';
import {
  Admin,
  Layout,
  LayoutProps,
  MenuProps,
  Resource,
  SidebarProps
} from "react-admin";

import { CatalogShow } from './CatalogShow';
import { ListCatalog } from './ListCatalog';
import { dataProvider } from "./dataProvider";

export const AppContext = createContext({ webId: "", setWebId: (webId: string) => {} });

const MyMenu = (props: MenuProps) => <></>
const MySidebar = (props: SidebarProps) => <></>
const MyLayout = (props: LayoutProps) => <Layout {...props} menu={MyMenu} sidebar={MySidebar} />;

export function App() {

  const [webId, setWebId] = useState<string>("");

  return (
    <AppContext.Provider value={{webId, setWebId}}>
      <Admin title="Catalog explorer" dataProvider={dataProvider(webId)} layout={MyLayout}>
        <Resource name="catalogs" list={ListCatalog} show={CatalogShow} />
      </Admin>
    </AppContext.Provider>
  )
}
