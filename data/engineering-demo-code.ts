export const ENGINEERING_DEMO_TABS = {
	orders: "orders.ts",
	schema: "schema.sql",
	deploy: "deploy.yml",
} as const;

export type EngineeringDemoTab = keyof typeof ENGINEERING_DEMO_TABS;

export const ENGINEERING_DEMO_CODE: Record<EngineeringDemoTab, string> = {
	orders: `function createOrder(input: OrderInputDTO) {
  const order = await db.insert(orders).values({
    userId: input.userId,
    total: input.amount,
    status: ORDERS.pending,
  })

  await queue.emit('order.created', order.id)
  return order
}`,
	schema: `create table orders (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references users(id),
  total     integer not null check (total >= 0),
  status    text not null default 'pending',
  created_at timestamptz default now()
);`,
	deploy: `name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm build && pnpm test --ci
      - uses: aws-actions/configure-aws-credentials@v4
      - run: aws codedeploy push --application-name prod-app --s3-location s3://deployments/app.zip --region us-east-1`,
};
