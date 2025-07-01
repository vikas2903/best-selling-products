import mongoose from "mongoose";

const topProductSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  productId: { type: String, required: true },
  title: String,
  handle: String,
  image: String,
  totalSold: Number,
  date: { type: String, required: true },
});

export default mongoose.models.TopProduct || mongoose.model("TopProduct", topProductSchema);
