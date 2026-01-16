export interface Customer {
  _id: string
  _rev?: string
  name: string
  email: string
  role: string
  status: boolean
  address?: string
  phone?: string
  createdAt: Date
}

export type NewCustomer = Omit<Customer, '_id' | '_rev' | 'createdAt'>
