import { Court, CourtController, CourtModule, CourtService, entities as CourtEntities } from './court'
import { Crew, CrewController, CrewModule, CrewService, entities as CrewEntities } from './crew'
import { Parent, ParentController, ParentModule, ParentService, entities as ParentEntities } from './parents'
import { Presence, PresenceController, PresenceModule, PresenceService, entities as PresenceEntities } from './prensence'
import { Student, StudentController, StudentModule, StudentService, entities as StudentEntities } from './students'

import { SecurityController, SecurityModule, SecurityServices, AuthByRole, AuthGuard, Roles, ROLES_KEY, IS_PUBLIC_KEY, Public } from './security'

export {
    Court, CourtController, CourtModule, CourtService,
    Crew, CrewController, CrewModule, CrewService,
    Parent, ParentController, ParentModule, ParentService,
    Presence, PresenceController, PresenceModule, PresenceService,
    Student, StudentController, StudentModule, StudentService,
    SecurityController, SecurityModule, SecurityServices, AuthByRole, AuthGuard, Roles, ROLES_KEY, IS_PUBLIC_KEY, Public
}

export const ENTITIES = [
    ...CourtEntities,
    ...CrewEntities,
    ...ParentEntities,
    ...PresenceEntities,
    ...StudentEntities
]