import AuthRepository from '@/repositories/authRepository'
import UserRepository from '@/repositories/master/userRepository'
import ContractTypeRepository from '@/repositories/master/contractTypeRepository'
import LocationRepository from '@/repositories/master/locationRepository'
import FinanceTypeRepository from '@/repositories/master/financeTypeRepository'
import ProjectTypeRepository from '@/repositories/master/projectTypeRepository'
import SettingTypeRepository from '@/repositories/master/settingTypeRepository'
import RegistrationTypeRepository from '@/repositories/master/registrationTypeRepository'
import KeyEstateRepository from '@/repositories/master/keyEstateRepository'
import EquityRepository from '@/repositories/master/equityRepository'
import PostCodeRepository from '@/repositories/master/postCodeRepository'
import MenuRepository from '@/repositories/common/menuRepository'
import SecularStagnationRepository from '@/repositories/process/secularStagnationRepository'
import LongTermNonReturnRepository from '@/repositories/process/longTermNonReturnRepository'
import RecordCallLogRepository from '@/repositories/process/recordCallLogRepository'
import RecordDeliveryRepository from '@/repositories/process/recordDeliveryRepository'
import RecordDocStampedRepository from '@/repositories/process/recordDocStampedRepository'
import RecordRegAppRepository from '@/repositories/process/recordRegAppRepository'
import RecordRegCompleteRepository from '@/repositories/process/recordRegCompleteRepository'
import WaitingCompletionRepository from '@/repositories/process/waitingCompletionRepository'
import DocumentRepository from './process/documentRepository'
import RecordScheduleAppToHgvRepository from '@/repositories/process/recordScheduleAppToHgv'
import ChartRepository from '@/repositories/chart/chartRepository'
import RecordRegAppPrintRepository from './print/recordRegAppPrintRepository'
import RecordRegFinalRepository from './process/recordRegFinalRepository'
import MigrationRepository from './migrate/migrationRepository'

const repositories = {
  auth: AuthRepository,
  // master
  user: UserRepository,
  contractType: ContractTypeRepository,
  location: LocationRepository,
  financeType: FinanceTypeRepository,
  projectType: ProjectTypeRepository,
  settingType: SettingTypeRepository,
  registrationType: RegistrationTypeRepository,
  keyEstate: KeyEstateRepository,
  equity: EquityRepository,
  menu: MenuRepository,
  postCode: PostCodeRepository,
  // process
  longTermNonReturn: LongTermNonReturnRepository,
  secularStagnation: SecularStagnationRepository,
  recordCallLog: RecordCallLogRepository,
  document: DocumentRepository,
  recordDelivery: RecordDeliveryRepository,
  recordDocStamped: RecordDocStampedRepository,
  recordRegApp: RecordRegAppRepository,
  recordRegComplete: RecordRegCompleteRepository,
  waitingCompletion: WaitingCompletionRepository,
  recordScheduleAppToHgv: RecordScheduleAppToHgvRepository,
  recordRegFinal: RecordRegFinalRepository,
  // chart
  chart: ChartRepository,
  // print
  recordRegAppPrint: RecordRegAppPrintRepository,
  // migration
  migration: MigrationRepository
}

export const RepositoryFactory = {
  get: (name) => repositories[name]
}
