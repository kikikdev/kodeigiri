# Kodegiri Api NestJS

setting posrgresql in env pada constant DATABASE_URL , pastikan postgres jalan dilocal import data dengan kodegiri.sql pada root folder
hati-hati database dan column harus sensitive case. biasanya ada issue ketika import tidak sensitive case

run in console/terminal

1. npm install --force 
2. npx prisma generate
3. npm run start
4. run in browser : http://localhost:8080/api/
