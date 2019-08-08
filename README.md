# NextJS Boilerplate

Opinionated NextJS Typescript boilerplate

## Contains

- Typescript
- Apollo Graphql with Hooks support
- Styled Components
- Graphql code generation
- Google Fonts
- Google Analytics
- Font Awesome Icons
- AWS S3 image uploads
- Context API
- Full screen loader

## Initial Mandatory Setup

- Change app name on `package.json`
- Update API endpoint on `codegen.yml` and `.graphqlconfig`
- Add `.env` from `.env.example`
- Replace colors
- Add Google Analytics ID to `utils/analytics.ts`
- Update AWS S3 Keys (If using AWS S3)

## Initial Optional Setup

- Adjust `components/GlobalStyles.tsx` to match
- Remove `utils/storage` and `utils/aws.ts` if not needed
- Replace this `README.md` with your own contents
