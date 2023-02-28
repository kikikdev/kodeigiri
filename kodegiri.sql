DROP TABLE IF EXISTS public.Event;
CREATE TABLE public.Event (
  id SERIAL,
  event_name varchar(255),
  event_date varchar(255),
  event_time varchar(255),
  event_location varchar(255),
  event_image text
);

DROP TABLE IF EXISTS public.KeyValueStore;
CREATE TABLE public.KeyValueStore (
  key varchar(100) NOT NULL DEFAULT '',
  value text,
  expiredAt timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO public.KeyValueStore VALUES ('token.kikik.dev@gmail.com','{\"xToken\":\"814f0e79e448058ba7cbfa60ed3ad0946685b32085095ed8e51dc56d953989e6\",\"xRefreshToken\":\"814f0e79e448058ba7cbfa60ed3ad0946685b32085095ed8e51dc56d953989e6\",\"xPermissions\":[\"CREATE_EVENT\",\"DELETE_EVENT\",\"DETAIL_EVENT\",\"EDIT_EVENT\",\"LIST_EVENT\"]}','2023-02-27 21:43:50');

CREATE TYPE public.is_active AS ENUM ('active', 'inactive');
DROP TABLE IF EXISTS public.User;
CREATE TABLE public.User (
  id SERIAL,
  fullname varchar(255) DEFAULT '',
  email varchar(255) NOT NULL,
  password varchar(100) DEFAULT '',
  isLoggedIn int DEFAULT '0',
  company varchar(255) DEFAULT NULL,
  department varchar(255) DEFAULT NULL,
  lastDateLogin timestamp NULL DEFAULT NULL,
  isActive public.is_active DEFAULT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy varchar(100) DEFAULT 'system',
  updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy varchar(100) DEFAULT 'system'
);

INSERT INTO public.User VALUES (1,'kikik','kikik.dev@gmail.com','3393ff04221a8b9b.6ce531337e8328334f81c3ccf057ab84105902fc2bbaefc8ccf9d309bb665fb3',0,'Kodegiri','Information Technology',NULL,'active','2022-03-27 07:30:26','system','2022-03-27 07:30:26','system');

DROP TABLE IF EXISTS public.UserHasRoles;
CREATE TABLE public.UserHasRoles (
  email varchar(255) NOT NULL DEFAULT '',
  roleCode varchar(20) NOT NULL DEFAULT '',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) DEFAULT 'system',
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(100) DEFAULT 'system'
);

INSERT INTO public.UserHasRoles VALUES ('kikik.dev@gmail.com','admin','2022-03-27 07:30:26','system','2022-03-27 07:30:26','system');

DROP TABLE IF EXISTS public.UserPermission;
CREATE TABLE public.UserPermission (
  permissionCode varchar(30) NOT NULL DEFAULT '',
  permissionDescription varchar(100) DEFAULT '',
  permissionGroups varchar(20) DEFAULT '',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) DEFAULT 'system',
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(100) DEFAULT 'system'
);

INSERT INTO public.UserPermission VALUES ('CREATE_EVENT','CREATE EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('DELETE_EVENT','DELETE EVENT','Menu','2021-10-21 01:31:10','system','2021-10-21 01:31:10','system'),('DETAIL_EVENT','DETAIL EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('EDIT_EVENT','EDIT EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system'),('LIST_EVENT','LIST EVENT','Menu','2021-10-21 01:28:55','system','2021-10-21 01:28:55','system');

DROP TABLE IF EXISTS public.UserRole;
CREATE TABLE public.UserRole (
  roleCode varchar(20) NOT NULL DEFAULT '',
  roleName varchar(100) DEFAULT '',
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy varchar(100) DEFAULT 'system',
  updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updatedBy varchar(100) DEFAULT 'system'
);

INSERT INTO public.UserRole VALUES ('admin','Admin','2021-10-26 02:34:39','system','2021-10-26 02:34:39','system'),('super_admin','Super Admin','2022-04-12 13:19:19','system','2022-04-12 13:19:19','system'),('user','User','2021-09-04 08:15:09','system','2021-09-04 08:28:31','system');

DROP TABLE IF EXISTS public.UserRolePermission;
CREATE TABLE public.UserRolePermission (
  roleCode varchar(20) NOT NULL DEFAULT '',
  permissionCode varchar(30) NOT NULL DEFAULT '',
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(100) DEFAULT 'system',
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by varchar(100) DEFAULT 'system'
);

INSERT INTO public.UserRolePermission VALUES ('admin','CREATE_EVENT','2023-02-27 04:41:52','system','2023-02-27 04:41:54','system'),('admin','DELETE_EVENT','2023-02-27 04:42:23','system','2023-02-27 04:42:25','system'),('admin','DETAIL_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system'),('admin','EDIT_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system'),('admin','LIST_EVENT','2023-02-27 04:41:54','system','2023-02-27 04:41:54','system');
