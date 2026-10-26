import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://jussikelloniemi_db_user:RiG0X33IYFK8YXID@mongodb.hddtyge.mongodb.net/");

await client.connect(async err => {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews")

    const pipeline = [
        {
            '$match': {
            'accommodates': {
                '$gt': 4
            }, 
            'price': {
                '$lt': 500
            }, 
            'amenities': 'Hair dryer'
            }
        }, {
            '$sort': {
            'price': 1
            }
        }, {
            '$project': {
            'name': 1, 
            'amenities': 1, 
            'price': 1, 
            'images': 1, 
            'description': 1
            }
        }, {
            '$limit': 20
        }
    ]

    const agg = await collection.aggregate(pipeline).toArray()

    console.log(agg)

    client.close()
})