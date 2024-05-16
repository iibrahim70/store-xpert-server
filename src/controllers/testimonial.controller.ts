import httpStatus from 'http-status';
import catchAsync from '../helpers/catchAsync';
import sendResponse from '../helpers/sendResponse';
import { TestimonialServices } from '../services/testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
  const result = await TestimonialServices.createTestimonialFromDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Testimonial created successfully!',
    data: result,
  });
});

const getAllTestimonials = catchAsync(async (req, res) => {
  const result = await TestimonialServices.getAllTestimonialsFromDB();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All testimonials retrieved successfully!',
    data: result,
  });
});

export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonials,
};
