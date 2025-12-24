export const setUser = (userData: any) => {
  localStorage.setItem('smartreps_user', JSON.stringify(userData));
};

export const getUser = () => {
  const userData = localStorage.getItem('smartreps_user');
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('smartreps_user');
};