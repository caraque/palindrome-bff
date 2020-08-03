const MongoMock = () => {
    return {
        connect: () => {
            return true;
        },
        findAll: () => {
            return [];
        },
        count: () => {
            return 1
        },
        findOne: ()=>{
            return []
        }
    };
};

module.exports = {
    MongoMock
};
