import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  completedDate?: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Flooring', 'Countertops', 'Bathrooms', 'Wall Cladding', 'Commercial', 'Residential', 'Other'],
    },
    location: {
      type: String,
    },
    completedDate: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

GallerySchema.index({ category: 1 });
GallerySchema.index({ featured: 1 });

export default mongoose.model<IGallery>('Gallery', GallerySchema);
