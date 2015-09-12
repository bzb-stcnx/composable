interface Logger {
  debug(format:string, ...params:any[]):void;
  info(format:string, ...params:any[]):void;
  warn(format:string, ...params:any[]):void;
  error(format:string, ...params:any[]):void;
  fatal(format:string, ...params:any[]):void;
}
