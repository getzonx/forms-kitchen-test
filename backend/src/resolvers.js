import ProductDbModel from './ProductDbModel';

export const resolvers = {
    Query: {
        async product(_, {code}) {
            return await ProductDbModel.findOne({code});
        },
        async search(_, {query}) {
            const options = query === null || query === undefined || query === '' ? 
                {}:{
                    $or: [
                        {code: {$regex: query, $options: 'i'}},
                        {description: {$regex: query, $options: 'i'}},
                ]};

            return await ProductDbModel.find(options).exec();
        }
    },
    Mutation: {
        async createProduct(_, {input}) {
            const productObj = new ProductDbModel(input);
            return await productObj.save();
        },
        async updateProduct(_, {code, input}) {
            return await ProductDbModel.findOneAndUpdate({code}, input);
        },
        async deleteProduct(_, {code}) {
            return await ProductDbModel.findOneAndDelete({code});
        }
    }
};