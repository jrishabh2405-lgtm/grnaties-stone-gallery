import mongoose, { Schema, Document } from 'mongoose';

interface ISpecification {
  colors: string[];
  finishes: string[];
  thickness: string[];
  sizes: string[];
}

interface IApplication {
  name: string;
  description: string;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  subCategory: string;
  origin: string;
  image: string;
  gallery: string[];
  description: string;
  specifications: ISpecification;
  applications: IApplication[];
  isImported: boolean;
  isPopular: boolean;
  price?: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Marble', 'Granite', 'Quartz', 'Onyx', 'Other'],
    },
    subCategory: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      colors: [String],
      finishes: [String],
      thickness: [String],
      sizes: [String],
    },
    applications: [
      {
        name: String,
        description: String,
      },
    ],
    isImported: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isPopular: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
