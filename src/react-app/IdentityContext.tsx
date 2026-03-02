import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

/**
 * interface IdentityContextInterface
 */
interface IdentityContextInterface {
    identity: any;
    loadingIdentity: boolean;
}

const IdentityContext = createContext<IdentityContextInterface | undefined>(undefined);

/**
 * useIdentityContext
 * @returns 
 */
export const useIdentityContext = () => {
    const context = useContext(IdentityContext);
    if (context === undefined) {
        throw new Error("useIdentityContext must be used within a IdentityProvider");
    }
    return context;
};

export default IdentityContext;


/**
 * IdentityProvider
 * @returns 
 */
export const IdentityProvider: React.FC = ({ children }) => {
    const [identity, setIdentity] = useState(null);
    const [loadingIdentity, setLoadingIdentity] = useState(true);

    useEffect(() => {
        axios.get('/async/id').then((response) => {
            setIdentity(response.data);
            setLoadingIdentity(false);
        }).catch((reason) => {
            if (reason.response.status === 401) {
                window.location.href = '/login';
            }
        });
    }, []);

    return (
        <IdentityContext.Provider value={{ identity, loadingIdentity }}>
            {children}
        </IdentityContext.Provider>
    );
};