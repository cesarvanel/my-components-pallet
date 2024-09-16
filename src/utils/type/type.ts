


export type DayModel = {
  day: number;
  isPrevDay: boolean;
  isNextDay: boolean;
  isMonthDay: boolean;
};

export type DoubleCalendarDayModel = {
   day:number;
   date: Date;
   isCurrentMonth: boolean;

}


export interface TabItem {
  title: string;
  content: string;
}

export interface TabItemWithOwlet {
  title: string;
  path: string;
}

export interface OptionSelect {
  label:string; 
  id:string | number

}