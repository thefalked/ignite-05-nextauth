import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAutenticated } = useContext(AuthContext);

  if (!isAutenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({ user, permissions, roles });

  return userHasValidPermissions;
}
