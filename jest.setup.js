// Mock required env vars for Next.js config and Faust
process.env.WORDPRESS_URL = 'http://localhost:8000'
process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://localhost:8000'
process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_1 = '1.gravatar.com'
process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME_2 = '2.gravatar.com'
require('@testing-library/jest-dom')
