export interface Schedule{
  classTitle : string;
  classInfo : string;
  classDateTime : string;
  classDuration : number;
  classTimeZones ? : string;
  classRecording : string;
  classType : string;
  recurringClass ? : number;
  aboutTeacher ? : string;
}