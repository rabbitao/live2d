export namespace Live2DCubismFramework {
  export interface CubismMotionParam {
    groupName: string;
    no: number;
    priority: number;
    callback?: () => void;
  }
}
