import {Task} from "./Task"

export interface Subject {
  name: string;
  id: string;
  tasks?: Task[];
}
