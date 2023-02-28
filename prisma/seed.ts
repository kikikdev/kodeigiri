const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
    try {
      await prisma.$queryRaw`INSERT INTO public.KeyValueStore VALUES ('token.kikik.dev@gmail.com','{\"xToken\":\"814f0e79e448058ba7cbfa60ed3ad0946685b32085095ed8e51dc56d953989e6\",\"xRefreshToken\":\"814f0e79e448058ba7cbfa60ed3ad0946685b32085095ed8e51dc56d953989e6\",\"xPermissions\":[\"CREATE_EVENT\",\"DELETE_EVENT\",\"DETAIL_EVENT\",\"EDIT_EVENT\",\"LIST_EVENT\"]}','2023-02-27 21:43:50');`;
      console.log('Added KeyValueStore data')
  
      await prisma.$queryRaw`INSERT INTO public.user VALUES (1,'kikik','kikik.dev@gmail.com','3393ff04221a8b9b.6ce531337e8328334f81c3ccf057ab84105902fc2bbaefc8ccf9d309bb665fb3','Kodegiri','Information Technology','active','2022-03-27 07:30:26','system','2022-03-27 07:30:26','system');`
      console.log('Added user data')

      await prisma.$queryRaw`INSERT INTO public.UserRole VALUES ('admin','Admin','2021-10-26 02:34:39','system','2021-10-26 02:34:39','system'),('super_admin','Super Admin','2022-04-12 13:19:19','system','2022-04-12 13:19:19','system'),('user','user','2021-09-04 08:15:09','system','2021-09-04 08:28:31','system');`
      console.log('Added UserRole data')
  
      await prisma.$queryRaw`INSERT INTO public.UserHasRoles VALUES ('kikik.dev@gmail.com','admin','2022-03-27 07:30:26','system','2022-03-27 07:30:26','system');`
      console.log('Added UserHasRoles data')
  
      await prisma.$queryRaw`INSERT INTO public.UserPermission VALUES ('CREATE_EVENT','CREATE EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('DELETE_EVENT','DELETE EVENT','Menu','2021-10-21 01:31:10','system','2021-10-21 01:31:10','system'),('DETAIL_EVENT','DETAIL EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('EDIT_EVENT','EDIT EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('LIST_EVENT','LIST EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system');`
      console.log('Added UserPermission data')

      await prisma.$queryRaw`INSERT INTO public.UserRolePermission VALUES ('admin','CREATE_EVENT','2023-02-27 04:41:52','system','2023-02-27 04:41:54','system'),('admin','DELETE_EVENT','2023-02-27 04:42:23','system','2023-02-27 04:42:25','system'),('admin','DETAIL_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system'),('admin','EDIT_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system'),('admin','LIST_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system');`
      console.log('Added UserRolePermission data')

    } catch (e) {
      console.error(e)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  }
  
load()





