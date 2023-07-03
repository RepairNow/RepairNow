import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { AccessTokenGuard } from './accessToken.guard';

const PermissionGuard = (permission: any): Type<CanActivate> => {
  class PermissionGuardMixin extends AccessTokenGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;

      return user?.role === permission;
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
