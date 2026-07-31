import { prisma } from '@/lib/prisma'

async function verify() {
  try {
    const counts = {
      profile: await prisma.profile.count(),
      visiMisi: await prisma.visiMisi.count(),
      subject: await prisma.subject.count(),
      asatidz: await prisma.asatidz.count(),
      activity: await prisma.activity.count(),
      doa: await prisma.doa.count(),
      registration: await prisma.registration.count()
    }
    console.log('Counts:', counts)

    const lastReg = await prisma.registration.findFirst({ orderBy: { id: 'desc' } })
    console.log('Last registration ID:', lastReg?.id)
    console.log('Last registration name:', lastReg?.name)

    const success = Object.values(counts).every((c) => c > 0)
    console.log('Data migration successful:', success)
  } catch (error) {
    console.error('Verification failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verify()
