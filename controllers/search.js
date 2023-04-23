const Ads = require('../models/ads');
const Company = require('../models/company');
const reader = require('xlsx')
const async = require('async');
const path = require('path');


exports.uplaodXl = async () =>{
    try {
        // console.log(req);
        const fullPath = path.join(__dirname, '../sampleCollectionsForFullStackTest.xlsx');
        const file = reader.readFile(fullPath)
        console.log("wrong");

        const sheets = file.SheetNames
        const dataSheet = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
        console.log(dataSheet);
        let adsSheet = []
        let companySheet = []
        for (let index = 1; index <= 7; index++) {
            const element = dataSheet[index];
            element._id = element.ads
            element.companyId = element.__EMPTY?element.__EMPTY:""
            element.primaryText = element.__EMPTY_1?element.__EMPTY_1:""
            element.headline = element.__EMPTY_2?element.__EMPTY_2:""
            element.description = element.__EMPTY_3?element.__EMPTY_3:""
            element.CTA = element.__EMPTY_4?element.__EMPTY_4:""
            element.imageUrl = element.__EMPTY_5?element.__EMPTY_5:""
            delete element.ads;
            delete element.__EMPTY;
            delete element.__EMPTY_1;
            delete element.__EMPTY_2;
            delete element.__EMPTY_3;
            delete element.__EMPTY_4;
            delete element.__EMPTY_5;
            adsSheet.push(element)
        }
        for (let index = 11; index < dataSheet.length; index++) {
            const element = dataSheet[index];
            element._id = element.ads
            element.name = element.__EMPTY?element.__EMPTY:""
            element.url = element.__EMPTY_1?element.__EMPTY_1:""
            delete element.ads;
            delete element.__Empty;
            delete element.__Empty_1;
            companySheet.push(element)
        }
        console.log(adsSheet);
        console.log(companySheet);
        await addToAdsDataBase(adsSheet)
        await addToCompanyDataBase(companySheet)
        // let adData = await Ads.find({})
        // let comData = await Company.find({})
        // console.log(adData);
        // console.log(comData);
    } catch (error) {
        console.log(error);
        return
    }
}


async function addToAdsDataBase(adsSheet){
    async.eachSeries(adsSheet, async (item) => {
      // perform an asynchronous operation on the item
      if(item.ads === 'companies'){

      }
      await pushAd(item)
    //   console.log(item);
    }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('All items processed successfully');
      }
    });
    async function pushAd(item){
        // console.log(item);
        const exist = await Ads.find({_id:item._id})
        if(exist.length > 0){
        }else{
            const entry = await Ads.create({
                _id:item["_id"],
                companyId:item["companyId"],
                primaryText:item["primaryText"],
                headline:item["headline"],
                description:item["description"],
                CTA:item["CTA"],
                imageUrl:item["imageUrl"]
            })
            await entry.save()
            console.log("Created");
        }
    }
}
async function addToCompanyDataBase(companySheet){
    async.eachSeries(companySheet, async (item) => {
      // perform an asynchronous operation on the item
      await pushCompany(item)
    //   console.log(item);
    }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('All items processed successfully');
      }
    });
    async function pushCompany(item){
        // console.log(item);
        const exist = await Company.find({_id:item._id})
        if(exist.length > 0){
        }else{
            console.log("Sssssss");
            const entry = await Company.create({
                _id:item["_id"],
                name:item["name"],
                url:item["url"]
            })
            await entry.save()
        }
    }
}


exports.searchInXl = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (searchTerm.length <= 0) {
      return;
    }
    console.log(searchTerm);
    const results = await Ads.aggregate([
        {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "added"
          }
        },
        {
        $match: {
            $or: [
              { primaryText: { $regex: searchTerm, $options: "i" } },
              { headline: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
              { "added.name": { $regex: searchTerm, $options: "i" } }
            ]
          }
        }
      ]);
    res.status(200).json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

