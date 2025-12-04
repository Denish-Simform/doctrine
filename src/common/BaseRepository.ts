export class BaseRepository {
  protected updateEntityRecursively<T>(entity: T, updateData: Partial<T>): T {
    for (const key in updateData) {
      if (typeof updateData[key] === 'object' && updateData[key] !== null) {
        if (!entity[key]) {
          entity[key] = {} as any;
        }
        this.updateEntityRecursively(entity[key], updateData[key]);
      } else {
        entity[key] = updateData[key] as any;
      }
    }
    return entity;
  }
}
