const mongoose = require('mongoose');

const mongoPath = 'mongodb+srv://Ark:vn7RoW7tzMUd9LAg@atlas.fzrap.mongodb.net/Atlas?retryWrites=true&w=majority';
module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose;
}