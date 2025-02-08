// tests/unit/user.test.ts
import User from '../../src/models/User';

describe('User Model Unit Tests', () => {
  it('should hash the password before saving', async () => {
    const user = new User({ email: 'hash@example.com', password: 'plainpassword' });
    await user.save();
    expect(user.password).not.toEqual('plainpassword');
  });
});
