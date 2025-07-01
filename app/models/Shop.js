import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  shop: { type: String, unique: true, required: true },
  accessToken: { type: String, required: true },
  scope: { type: String },
  installedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
