import { addRegistration } from '@/lib/db'

async function test() {
  try {
    console.log('Testing addRegistration...')
    const result = await addRegistration(
      'Test User',
      '081234567890',
      'Iqra',
      'Test message'
    )
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}

test()
