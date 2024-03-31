import { Schema, model } from 'mongoose';
import { ITestimonial } from '../interfaces/testimonial.interface';

// Define the schema for the Testimonial model
const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// deleting isVisible field
testimonialSchema.methods.toJSON = function () {
  const testimonialObj = this.toObject();

  delete testimonialObj.isVisible;
  return testimonialObj;
};

export const Testimonial = model<ITestimonial>(
  'Testimonial',
  testimonialSchema,
);
