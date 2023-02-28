//
// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: User;
//     }
//   }
// }
//
// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   constructor(private usersService: UsersService) {}
//
//   async use(req: Request, res: Response, next: NextFunction) {
//     const { userId } = req.session || {};
//
//     if (userId) {
//       // const user = await this.usersService.findOne(userId);
//       const user = {} as any;
//       req.currentUser = user;
//     }
//
//     next();
//   }
// }
