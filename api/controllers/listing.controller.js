import Listing from "../models/listing.models.js"

export const createListing = async (req,res,next) => {
    try {
        const listing = await Listing.create(req.body) //create() equals to, const listing = new Listing({}), await listing.save()
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}