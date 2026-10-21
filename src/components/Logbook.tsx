import Log from "./Log";
import { userContext } from "../data/UserData";
export default function LogBook() {
  const { archive, userSession, lastYearAttempt, lastMonthAttempt, lastDayAttempt, lastWeekAttempt  } = userContext.get();
   
    

  return (
    <div>
      <h2 className="text-lg font-bold">Log</h2>
      <div className="flex w-dvw snap-x snap-mandatory gap-8 overflow-scroll justify-start p-8">
        <Log title='first post' content="Today had a bunch of stuff happen and all that stuff was stuff that happened"/>
        <Log title='first post' content="kyou mo onajiku, iroirona koto ga okurimashita, de sonna atte iru kotto ha jitsuni ni okorimashita da to iute iitakatta desu." />
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
        <Log title='first post' content="123"/>
      </div>
    </div>
  )
} 
