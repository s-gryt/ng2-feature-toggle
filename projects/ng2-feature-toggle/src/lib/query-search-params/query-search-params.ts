export class QuerySearchParams {
  private readonly name: string;
  private readonly url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }

  get isFound(): boolean {
    return this.isNameFound(this.name, this.url);
  }

  private isNameFound(name: string, searchParams: string) {
    if (!name || !searchParams) return false;
    return searchParams.includes(name);
  }
}
