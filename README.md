#ToLearn
1.) TypeScript crash course
        <Resources>
            </> https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
            </> https://www.youtube.com/watch?v=joTOrCiAPB4

2.) Material UI

-----------------------------------------------------------------------------------------------

#Learnings 
1.) TypeScript:
        <TopicsCovered>
            </> Typing Component Props
                type AppProps = {
                    message: string;
                    count: number;
                    disabled: boolean;
                } or,
                interface AppProps = {
                    message: string;
                    count: number;
                }
                //consider using type for your React Component Props and State, for consistency and because it is more constrained

            </> optional prop
                optional?: OptionalType;
            
            </> types union (|)
                < string | number | null >

            </> Function Components
                type AppProps = {
                    message: string;
                };
                const App: React.FC<AppProps> = ({ message }) => <div>{message}</div>;

            </> Forms and Events:
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);    
                }
                const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();    
                }

            </> Hooks: (useState)
                const [user, setUser] = useState<User | null>(null);
                
            </> Hooks: (useContext)
                // types file (Define the Context Type)
                    export interface User {
                    name: string;
                    email: string;
                    }

                    export interface UserContextType {
                    user: User | null;
                    setUser: React.Dispatch<React.SetStateAction<User | null>>;
                    }
                
                // context file (Create the Context)
                    import React, { createContext, useState, useContext } from 'react';
                    import { User, UserContextType } from './types';

                    // Create the context
                    const UserContext = createContext<UserContextType | undefined>(undefined);

                    // Create a provider component
                    export const UserProvider: React.FC = ({ children }) => {
                    const [user, setUser] = useState<User | null>(null);

                    return (
                        <UserContext.Provider value={{ user, setUser }}>
                        {children}
                        </UserContext.Provider>
                    );
                    };

                    // Custom hook to use the UserContext
                    export const useUser = (): UserContextType => {
                    const context = useContext(UserContext);
                    if (!context) {
                        throw new Error('useUser must be used within a UserProvider');
                    }
                    return context;
                    };

                // App.tsx (Provide the Context)
                    import React from 'react';
                    import { UserProvider } from './UserContext';
                    import UserProfile from './UserProfile';

                    const App: React.FC = () => {
                    return (
                        <UserProvider>
                        <div>
                            <h1>Welcome to the App</h1>
                            <UserProfile />
                        </div>
                        </UserProvider>
                    );
                    };
                    export default App;

                // UserProfile.tsx (Consume context )
                    import React from 'react';
                    import { useUser } from './UserContext';

                    const UserProfile: React.FC = () => {
                    const { user, setUser } = useUser();

                    const handleLogin = () => {
                        setUser({ name: 'Pradip Singh', email: 'kumarpradip3956@gmail.com' });
                    };

                    return (
                        <div>
                        {user ? (
                            <div>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            </div>
                        ) : (
                            <button onClick={handleLogin}>Login</button>
                        )}
                        </div>
                    );
                    };
                    export default UserProfile;
                
    Good to go..

2.) Material UI
            

-----------------------------------------------------------------------------------------------

