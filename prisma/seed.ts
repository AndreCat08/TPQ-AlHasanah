import fs from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'
import { INITIAL_DATA } from './seed-data'

async function main() {
  try {
    const dbJsonPath = path.join(process.cwd(), 'data', 'db.json')
    let dataToSeed = INITIAL_DATA

    if (fs.existsSync(dbJsonPath)) {
      try {
        const raw = fs.readFileSync(dbJsonPath, 'utf-8')
        const existing = JSON.parse(raw)
        dataToSeed = existing
        console.log('✓ Loaded existing data from data/db.json')
      } catch (err) {
        console.warn('⚠ Failed to parse data/db.json, falling back to INITIAL_DATA')
      }
    }

    await prisma.profile.upsert({
      where: { id: 1 },
      update: {
        name: dataToSeed.profile.name,
        tagline: dataToSeed.profile.tagline,
        phone: dataToSeed.profile.phone,
        email: dataToSeed.profile.email,
        address: dataToSeed.profile.address,
        established: dataToSeed.profile.established,
        statsJson: JSON.stringify(dataToSeed.profile.stats)
      },
      create: {
        id: 1,
        name: dataToSeed.profile.name,
        tagline: dataToSeed.profile.tagline,
        phone: dataToSeed.profile.phone,
        email: dataToSeed.profile.email,
        address: dataToSeed.profile.address,
        established: dataToSeed.profile.established,
        statsJson: JSON.stringify(dataToSeed.profile.stats)
      }
    })

    await prisma.visiMisi.upsert({
      where: { id: 1 },
      update: {
        visi: dataToSeed.visiMisi.visi,
        misiJson: JSON.stringify(dataToSeed.visiMisi.misi)
      },
      create: {
        id: 1,
        visi: dataToSeed.visiMisi.visi,
        misiJson: JSON.stringify(dataToSeed.visiMisi.misi)
      }
    })

    for (const subject of dataToSeed.subjects) {
      await prisma.subject.upsert({
        where: { id: subject.id },
        update: {
          title: subject.title,
          category: subject.category,
          icon: subject.icon,
          desc: subject.desc,
          topicsJson: JSON.stringify(subject.topics),
          order: subject.id - 1
        },
        create: {
          id: subject.id,
          title: subject.title,
          category: subject.category,
          icon: subject.icon,
          desc: subject.desc,
          topicsJson: JSON.stringify(subject.topics),
          order: subject.id - 1
        }
      })
    }

    for (const asatidz of dataToSeed.asatidz) {
      await prisma.asatidz.upsert({
        where: { id: asatidz.id },
        update: {
          name: asatidz.name,
          role: asatidz.role,
          bio: asatidz.bio,
          image: asatidz.image,
          quote: asatidz.quote,
          order: asatidz.id - 1
        },
        create: {
          id: asatidz.id,
          name: asatidz.name,
          role: asatidz.role,
          bio: asatidz.bio,
          image: asatidz.image,
          quote: asatidz.quote,
          order: asatidz.id - 1
        }
      })
    }

    for (const activity of dataToSeed.activities) {
      await prisma.activity.upsert({
        where: { id: activity.id },
        update: {
          title: activity.title,
          category: activity.category,
          date: activity.date,
          image: activity.image,
          description: activity.description,
          order: activity.id - 1
        },
        create: {
          id: activity.id,
          title: activity.title,
          category: activity.category,
          date: activity.date,
          image: activity.image,
          description: activity.description,
          order: activity.id - 1
        }
      })
    }

    for (const doa of dataToSeed.sampleDoas) {
      await prisma.doa.upsert({
        where: { id: doa.id },
        update: {
          title: doa.title,
          arabic: doa.arabic,
          latin: doa.latin,
          meaning: doa.meaning,
          order: doa.id - 1
        },
        create: {
          id: doa.id,
          title: doa.title,
          arabic: doa.arabic,
          latin: doa.latin,
          meaning: doa.meaning,
          order: doa.id - 1
        }
      })
    }

    for (const reg of dataToSeed.registrations) {
      const regId = parseInt(reg.id.replace(/\D/g, '')) || Date.now()
      await prisma.registration.upsert({
        where: { id: regId },
        update: {
          name: reg.name,
          phone: reg.phone,
          program: reg.program,
          message: reg.message,
          createdAt: new Date(reg.createdAt)
        },
        create: {
          id: regId,
          name: reg.name,
          phone: reg.phone,
          program: reg.program,
          message: reg.message,
          createdAt: new Date(reg.createdAt)
        }
      })
    }

    console.log('✓ Seed completed successfully')
  } catch (error) {
    console.error('✗ Seed failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
