import { solidWebIdProfileFactory } from "@semantizer/mixin-solid-webid";
import { personFactory, catalogFactory } from "@datafoodconsortium/connector-test";
import { CreateParams, DeleteManyParams, DeleteParams, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetOneParams, GetOneResult, UpdateManyParams, UpdateParams } from "react-admin";

export const dataProvider = (webId: string) => {
    return {
    getList: async (resource: string, params: GetListParams): Promise<GetListResult> => {
        if (webId && webId !== "" && resource === "catalogs") { 
            const solidProfileDocument = await semantizer.load(webId, solidWebIdProfileFactory);
            await solidProfileDocument.loadExtendedProfile();
            
            const catalogs = [];
            const person = semantizer.build(personFactory, solidProfileDocument);
            const enterprises = person.getAffiliatedEnterprises();

            for (const enterprise of enterprises) {
                await enterprise.load();
                await enterprise.loadExtendedProfile();
                for (const catalog of enterprise.getMaintainedCatalogs()) {
                    await catalog.load();
                    catalogs.push({ 
                        id: catalog.getOrigin()?.value,
                        name: catalog.getName(), 
                        description: catalog.getDescription()
                    });
                }
            }

            return {
                data: catalogs,
                total: catalogs.length,
            };
        }

        return { data: [], total: 0 }
    },

    getOne: async (resource: string, params: GetOneParams): Promise<GetOneResult> => {
        if (resource === 'catalogs') {
            const catalog = await semantizer.load(params.id.toString(), catalogFactory);
            const catalogItems = [];

            for (const catalogItem of catalog.getCatalogItems()) {
                await catalogItem.load();
                catalogItems.push({ 
                    id: catalogItem.getOrigin()?.value, 
                    name: catalogItem.getName(),
                })
            }
            
            return {
                data: {
                    id: params.id,
                    name: catalog.getName(),
                    description: catalog.getDescription(),
                    catalogItems
            }
            };
        }

        throw new Error("Not implemented.");
    },

    getMany: async (resource: string, params: GetManyParams) => {
        throw new Error("Not implemented.");
    },

    getManyReference: async (resource: string, params: GetManyReferenceParams) => {
        throw new Error("Not implemented.");
    },

    create: async (resource: string, params: CreateParams) => {
        throw new Error("Not implemented.");
    },

    update: async (resource: string, params: UpdateParams) => {
        throw new Error("Not implemented.");
    },

    updateMany: async (resource: string, params: UpdateManyParams) => {
        throw new Error("Not implemented.");
    },

    delete: async (resource: string, params: DeleteParams) => {
        throw new Error("Not implemented.");
    },

    deleteMany: async (resource: string, params: DeleteManyParams) => {
        throw new Error("Not implemented.");
    }
    }
}