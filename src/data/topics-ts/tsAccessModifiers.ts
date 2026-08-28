import type { Topic } from "../../types";

export const tsAccessModifiersTopic: Topic = {
  id: "ts-access-modifiers",
  title: "TypeScript Access Modifiers",
  category: "Classes & OOP",
  shortExplanation: `Access modifiers control *where* a class member can be used from: \`public\` (the default) is accessible from anywhere, \`private\` only from inside the declaring class, and \`protected\` from the declaring class *and* its subclasses.

- No modifier at all means \`public\` — every property and method is public unless stated otherwise
- \`private balance: number;\` can only be read or written from methods inside that same class
- \`protected\` splits the difference — hidden from outside code, but still visible to a class that \`extends\` this one`,
  longExplanation: `Every class member in TypeScript has a visibility, whether or not it's written out — access modifiers just make that visibility explicit and enforce it at compile time.

- **\`public\`** is the default — any member with no modifier at all is fully accessible from anywhere: \`instance.someProperty\` works from outside the class, from a subclass, anywhere. Writing \`public\` explicitly is allowed but rarely necessary since it changes nothing.
- **\`private\`** restricts a member so that only code written *inside that same class* can access it. Trying to read or write \`instance.secret\` from outside the class — even from an otherwise-related piece of code — is a compile-time error. This is the tool for genuine internal implementation details that outside code has no business touching directly.
- **\`protected\`** sits between the two: hidden from outside code exactly like \`private\`, but still visible inside any class that \`extends\` the declaring class. This is useful for shared internals that a whole family of related classes should be able to use, without exposing them to unrelated consumers.
- Access modifiers can be applied directly to **constructor parameter shorthand** too, combining declaration, assignment, and visibility in one place: \`constructor(private balance: number)\`.
- An important nuance: TypeScript's \`private\` and \`protected\` are **compile-time-only** checks. Once compiled to plain JavaScript, the type annotations disappear and the underlying property still exists on the object like any other — nothing at runtime physically prevents access (unlike JavaScript's own native \`#privateField\` syntax, a separate, newer feature that *is* enforced at runtime). TypeScript's modifiers exist purely to catch accidental misuse while writing and maintaining code, not to build airtight runtime security around sensitive data.
- A practical mental model: reach for \`private\` when a detail is purely internal bookkeeping a class needs for itself; reach for \`protected\` when a whole family of subclasses needs shared access to something outside code still shouldn't touch; leave everything else \`public\`, since that's the default and matches ordinary JavaScript object behavior.

Access modifiers, together with \`readonly\` (a related but independent concept covered separately), are the main tools TypeScript gives a class for controlling exactly how the rest of a codebase is allowed to interact with its internals.`,
  examples: [
    {
      id: "private-balance",
      title: "A private field with public methods around it",
      summary: "balance can only be read or written from inside BankAccount.",
      code: `class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

function App() {
  const account = new BankAccount(100);
  account.deposit(50);
  account.withdraw(30);

  // account.balance;      // Error: "balance" is private and only accessible within BankAccount.
  // account.balance = 0;  // Error: same reason.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Balance: \${account.getBalance()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Uncomment either line above in the editor — TypeScript blocks direct access to "balance" from outside the class.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "protected-in-subclass",
      title: "protected: visible in a subclass, hidden from outside",
      summary: "Manager can use Employee's protected members; outside code cannot.",
      code: `class Employee {
  constructor(protected baseSalary: number) {}

  protected calculateBonus(): number {
    return this.baseSalary * 0.1;
  }
}

class Manager extends Employee {
  describePay(): string {
    // "baseSalary" and "calculateBonus" are protected — visible here because
    // Manager extends Employee, even though they're not public.
    const bonus = this.calculateBonus();
    return "Base: $" + this.baseSalary + ", Bonus: $" + bonus;
  }
}

function App() {
  const manager = new Manager(60000);

  // manager.baseSalary;       // Error from outside: "baseSalary" is protected.
  // manager.calculateBonus(); // Error from outside: "calculateBonus" is protected.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{manager.describePay()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "protected" members are visible inside Manager because it extends Employee, but still blocked from outside code — try uncommenting the lines above.
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "public-vs-private-contrast",
      title: "public (the default) contrasted directly with private",
      summary: "username is freely readable; passwordHash is not.",
      code: `class User {
  public username: string;   // accessible from anywhere (the default, written explicitly here)
  private passwordHash: string;

  constructor(username: string, passwordHash: string) {
    this.username = username;
    this.passwordHash = passwordHash;
  }

  checkPassword(hash: string): boolean {
    return this.passwordHash === hash;
  }
}

function App() {
  const user = new User("ada", "a1b2c3");

  const publicRead = user.username;    // fine — public
  // const leaked = user.passwordHash; // Error — private

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>Username: {publicRead}</p>
      <p>Password check: {user.checkPassword("a1b2c3") ? "match" : "no match"}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "username" is freely readable; "passwordHash" can only be used from inside methods of User itself, like "checkPassword".
      </p>
    </div>
  );
}

render(<App />);`,
    },
    {
      id: "access-modifiers-with-shorthand",
      title: "Access modifiers combined with constructor shorthand",
      summary: "public and private mixed freely in the same parameter list.",
      code: `class Wallet {
  // Access modifiers combine with constructor parameter shorthand from the Classes topic.
  constructor(public owner: string, private cents: number) {}

  addCents(amount: number): void {
    this.cents += amount;
  }

  formatted(): string {
    return this.owner + "'s wallet: $" + (this.cents / 100).toFixed(2);
  }
}

function App() {
  const wallet = new Wallet("Grace", 2599);
  wallet.addCents(401);

  // wallet.cents; // Error: "cents" is private, even though "owner" (public) is freely accessible.

  return (
    <div style={{ display: "grid", gap: 6 }}>
      <p>{wallet.formatted()}</p>
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        "public" and "private" can be mixed freely across the same constructor's parameter list.
      </p>
    </div>
  );
}

render(<App />);`,
    },
  ],
};
