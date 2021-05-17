const mongoose = require('mongoose');

    const settingSchema = new mongoose.Schema({
        siteName: {type: String, required: true},
        whatsappNumber: {type: Number, required: true},
        sideBarColor: String,
        sideBarImage: String,
        lastModified: {type: Date, default: null},
        lastChangedBy: {type: String, default: null}
    });

module.exports = new mongoose.model('settings', settingSchema);