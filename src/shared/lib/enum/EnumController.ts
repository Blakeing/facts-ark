export interface EnumChoice<T = number | string> {
  id: T
  name: string
  description?: string
}

export abstract class EnumController<T = number | string> {
  public choices: EnumChoice<T>[]

  constructor() {
    this.choices = []
  }

  public get sortedChoices(): EnumChoice<T>[] {
    return [...this.choices].sort((a, b) => a.name.localeCompare(b.name))
  }

  public getDescription(id: T, missing: string = 'Unknown'): string {
    return this.choices.find((x) => x.id === id)?.name ?? missing
  }

  public descriptions(): string[] {
    return this.choices.map((c) => c.name).sort()
  }

  public findById(id: T): EnumChoice<T> | undefined {
    return this.choices.find((x) => x.id === id)
  }

  public getChoices(): EnumChoice<T>[] {
    return this.choices
  }
}
