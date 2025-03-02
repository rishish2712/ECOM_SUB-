//USER
const UserName = z
  .string()
  .min(3, { message: 'Username must be at least 3 characters' })
  .max(50, { message: 'Username must be at most 30 characters' })
const Email = z.string().min(1, 'Email is required').email('Email is invalid')
const Password = z
  .string()
  .min(8, 'Password must be at least 8 characters including numbers')
const UserRole = z.string().min(1, 'Role is required')

export const UserInputSchema = z.object({
  name: UserName,
  email: Email,
  image: z.string().optional(),
  emailVerified: z.boolean(),
  role: UserRole,
  password: Password,
  paymentMethod: z.string().min(1, 'Payment method is required'),
  address: z.object({
    fullNmae: z.string().min(3, 'Full Name is required'),
    street: z.string().min(3, 'Street is required'),
    city: z.string().min(3, 'City is required'),
    postalCode: z.string().min(6, 'Postal code is required'),
    country: z.string().min(3, 'Country is required'),
    phone: z.string().min(10, 'Phone number is required'),
  }),
})

export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
})
