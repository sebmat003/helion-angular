# Tips

- Add auth guard
- Add auth service with a loggedIn boolean property, and methods login, logout (using signals)
- In guard, implement canActivateFn to determine if user is logged in or not
- Add button login to login page, and logout to dashboard
- Timer should execute logout method from authService
- Add guard to app.routes.ts
