const mongoose = require('mongoose');

const mongoPath = 'mongodb+srv://Ark:vn7RoW7tzMUd9LAg@codex.fzrap.mongodb.net/Codex?retryWrites=true&w=majority';

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose;
}