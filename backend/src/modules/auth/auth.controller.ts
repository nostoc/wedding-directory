import { Controller, Post, Req, UseGuards, Res, HttpStatus } from "@nestjs/common";
import { RequestWithVisitor } from './request-with-visitor.interface';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from 'express';



@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: RequestWithVisitor, @Res() res: Response): void {
        if (!req.visitor) {
            throw new Error('Visitor not found in request');
        }

        const { access_token } = this.authService.login(req.visitor);

        // Set access_token as a regular cookie (not HttpOnly, so it is accessible from frontend)
        res.cookie('access_token', access_token, {
            httpOnly: false,  // Set this to false so the cookie is accessible to frontend JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production (HTTPS)
            sameSite: 'lax',  // Adjust sameSite policy based on your use case (e.g., 'strict', 'none')
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        // Return the access_token in the response as well
        res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }



}