import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "src/user/entity/user.entity";

export const GetUser = createParamDecorator((data, context: ExecutionContext): Users=>{
    const req = context.switchToHttp().getRequest();
    return req.user;
}
    
)