import { Actions as User } from './user';
import { Actions as Reservations } from './reservations';

const { trySignIn, signOut } = User;
const { loadReservation } = Reservations;

export { trySignIn, signOut };
export { loadReservation };