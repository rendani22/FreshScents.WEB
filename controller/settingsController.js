const mongoose = require('mongoose'),
      settingsSchema = require('../models/settings');

module.exports.createSetting = async (req,res) =>{
    const newSetting = req.body;
    console.log(newSetting);

    settingsSchema.create(newSetting, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            });
        }
        else {
            // item.save();
            res.status(201).json({
                success: true,
                message: "Saved"
            });
        }
    });
}

module.exports.findAllSettings = async (req,res) => {
    const settingDetails = await findSetting();
    console.log(settingDetails)
    return settingDetails;
}


module.exports.changeSetting = async (req,res) =>{
    const newSetting = req.body;
    try{
        const settingDetails = await findSetting();
        Object.keys(settingDetails._doc).forEach(key => {
            if(key === Object.keys(newSetting)[0]){
                settingDetails[key] = newSetting[key];

                 settingDetails.save((err,smal) =>{
                    if(err) {
                        res.json({
                            success: false,
                            message: err
                        });
                    }else{
                        res.json({
                            success: true,
                            message: "Setting updated successfully"
                        });
                    }
                });
            }

            // res.status(400).json({
            //     success: false,
            //     message: "huh"
            // });
            
        })

    }catch{

    }

}

var findSetting = async () =>{
    return await settingsSchema.findOne().exec();
}