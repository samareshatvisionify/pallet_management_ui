# Assets

This folder contains static assets for the VisionAI Pallet Management application.

## Structure

- `/illustrations/` - SVG illustrations used throughout the application
  - `auth-illustration.svg` - Animated warehouse illustration for the authentication screen

## Usage

### Illustrations

The illustrations are optimized SVG files that include:
- Animated elements for visual appeal
- Consistent color scheme matching the application theme
- Scalable designs that work across different screen sizes

### Adding New Illustrations

1. Create SVG files with appropriate naming conventions
2. Ensure they follow the application's color palette:
   - Primary Blue: #3B82F6
   - Secondary Purple: #8B5CF6
   - Success Green: #10B981
   - Warning Orange: #F59E0B
   - Error Red: #EF4444

3. Optimize for performance:
   - Minimize file size
   - Use inline styles or CSS classes
   - Consider animation performance

## Integration with Clerk

The current authentication system is designed to be easily replaceable with Clerk:

1. Replace the `useAuth` hook implementation
2. Update the `AuthProvider` to use Clerk's authentication
3. Replace the login form with Clerk's sign-in component
4. The layout structure will remain the same 